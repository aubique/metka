package ensibs.c4.metka.service;

import ensibs.c4.metka.exception.BadResourceException;
import ensibs.c4.metka.exception.ResourceAlreadyExistsException;
import ensibs.c4.metka.exception.ResourceNotFoundException;
import ensibs.c4.metka.model.Marker;

import java.util.List;

public interface MarkerService {

    List<Marker> getMarkListFull();

    List<Marker> getMarkerListByGroup(Long groupId) throws ResourceNotFoundException;

    Marker addMarkerByGroup(Marker marker, Long groupId) throws ResourceAlreadyExistsException, BadResourceException;

    void changeMarker(Marker marker, Long markId) throws ResourceNotFoundException, BadResourceException;

    void removeMarker(Long markId) throws ResourceNotFoundException;
}
