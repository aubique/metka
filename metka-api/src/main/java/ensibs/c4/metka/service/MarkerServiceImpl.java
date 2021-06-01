package ensibs.c4.metka.service;

import ensibs.c4.metka.exception.BadResourceException;
import ensibs.c4.metka.exception.ResourceAlreadyExistsException;
import ensibs.c4.metka.exception.ResourceNotFoundException;
import ensibs.c4.metka.model.Group;
import ensibs.c4.metka.model.Marker;
import ensibs.c4.metka.repository.GroupRepository;
import ensibs.c4.metka.repository.MarkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class MarkerServiceImpl implements MarkerService {

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    MarkerRepository markerRepository;

    @Override
    public List<Marker> getMarkListFull() {
        return markerRepository.findAll();
    }

    @Override
    public List<Marker> getMarkerListByGroup(Long groupId) throws ResourceNotFoundException {
        final List<Marker> groupMarkerList = markerRepository.findAllByStudgroup_Id(groupId);
        if (groupMarkerList.isEmpty()) throw new ResourceNotFoundException();

        return groupMarkerList;
    }

    @Override
    @Transactional
    public Marker addMarkerByGroup(Marker markerToPersist, Long groupId)
            throws ResourceAlreadyExistsException, BadResourceException {

        final Group existingGroup = groupRepository.findById(groupId)
                .orElseThrow(BadResourceException::new);
        markerToPersist.setStudgroup(existingGroup);

        // JPA should generate Marker ID itself before persist
        if (markerToPersist.getId() != null)
            markerToPersist.setId(null);

        // Make sure that marker doesn't exist to prevent collisions
        Example<Marker> exampleMarker = Example.of(markerToPersist);
        if (markerRepository.exists(exampleMarker))
            throw new ResourceAlreadyExistsException(); // 409 - conflict

        return markerRepository.save(markerToPersist);
    }

    @Override
    @Transactional
    public void changeMarker(Marker marker, Long markerId) throws ResourceNotFoundException, BadResourceException {
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    @Transactional
    public void removeMarker(Long markerId) throws ResourceNotFoundException {
        markerRepository.findById(markerId).orElseThrow(ResourceNotFoundException::new);

        markerRepository.deleteById(markerId);
    }
}
