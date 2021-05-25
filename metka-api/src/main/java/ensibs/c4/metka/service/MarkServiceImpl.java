package ensibs.c4.metka.service;

import ensibs.c4.metka.exception.BadResourceException;
import ensibs.c4.metka.exception.ResourceNotFoundException;
import ensibs.c4.metka.model.Mark;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class MarkServiceImpl implements MarkService {

    @Override
    public List<Mark> getMarkListFull() {
        return null;
    }

    @Override
    public List<Mark> getMarkListByGroup(Long groupId) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public Mark addMarkByGroup(Mark mark, Long groupId) throws ResourceNotFoundException, BadResourceException {
        return null;
    }

    @Override
    public void changeMark(Mark mark, Long markId) throws ResourceNotFoundException, BadResourceException {
    }

    @Override
    public void removeMark(Mark markId) throws ResourceNotFoundException {
    }
}
