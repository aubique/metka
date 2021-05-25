package ensibs.c4.metka.service;

import ensibs.c4.metka.exception.BadResourceException;
import ensibs.c4.metka.exception.ResourceNotFoundException;
import ensibs.c4.metka.model.Mark;

import java.util.List;

public interface MarkService {

    List<Mark> getMarkListFull();

    List<Mark> getMarkListByGroup(Long groupId) throws ResourceNotFoundException;

    Mark addMarkByGroup(Mark mark, Long groupId) throws ResourceNotFoundException, BadResourceException;

    void changeMark(Mark mark, Long markId) throws ResourceNotFoundException, BadResourceException;

    void removeMark(Mark markId) throws ResourceNotFoundException;
}
