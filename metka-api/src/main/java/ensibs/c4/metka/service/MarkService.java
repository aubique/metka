package ensibs.c4.metka.service;

import ensibs.c4.metka.exception.BadResourceException;
import ensibs.c4.metka.exception.ResourceAlreadyExistsException;
import ensibs.c4.metka.exception.ResourceNotFoundException;
import ensibs.c4.metka.model.Marker;

import java.util.List;

public interface MarkService {

    List<Marker> getMarkListFull();

    List<Marker> getMarkListByGroup(Long groupId) throws ResourceNotFoundException;

    Marker addMarkByGroup(Marker marker, Long groupId) throws ResourceAlreadyExistsException, BadResourceException;

    void changeMark(Marker marker, Long markId) throws ResourceNotFoundException, BadResourceException;

    void removeMark(Long markId) throws ResourceNotFoundException;
}
