package ensibs.c4.metka.controller;

import com.google.gson.Gson;
import ensibs.c4.metka.exception.BadResourceException;
import ensibs.c4.metka.exception.ResourceAlreadyExistsException;
import ensibs.c4.metka.exception.ResourceNotFoundException;
import ensibs.c4.metka.model.Marker;
import ensibs.c4.metka.service.MarkService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@Log4j2
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/")
public class ApiController {

    @Autowired
    private Gson gson;

    @Autowired
    private MarkService markService;

    @GetMapping("groups")
    public ResponseEntity<List<Marker>> readMarkAll() {
        final List<Marker> groupMarkers = markService.getMarkListFull();
        // 200
        return ResponseEntity.ok(groupMarkers);
    }

    @GetMapping("group/{groupId:[\\d]+")
    public ResponseEntity<List<Marker>> readMarkSingle(@PathVariable Long groupId) {
        try {
            final List<Marker> groupMarker = markService.getMarkListByGroup(groupId);
            // 200
            return ResponseEntity.ok(groupMarker);
        } catch (ResourceNotFoundException ex) {
            // 404
            log.error(ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("group/{groupId:[\\d]+}")
    public ResponseEntity<?> createMark(@PathVariable Long groupId, @RequestBody Marker postMarker)
            throws URISyntaxException {
        try {
            final Marker newMarker = markService.addMarkByGroup(postMarker, groupId);
            // 201
            return ResponseEntity.created(new URI("/rest/mark/" + newMarker.getId())).body(newMarker);
        } catch (ResourceAlreadyExistsException ex) {
            // 409
            log.error(ex.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (BadResourceException ex) {
            // 400
            log.error(ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("mark/{markId:[\\d]}")
    public ResponseEntity<Void> deleteMark(@PathVariable Long markId) {
        try {
            markService.removeMark(markId);
            // 200
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException ex) {
            // 404
            log.error(ex.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}
