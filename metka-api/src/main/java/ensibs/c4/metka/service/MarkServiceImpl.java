package ensibs.c4.metka.service;

import ensibs.c4.metka.exception.BadResourceException;
import ensibs.c4.metka.exception.ResourceAlreadyExistsException;
import ensibs.c4.metka.exception.ResourceNotFoundException;
import ensibs.c4.metka.model.Group;
import ensibs.c4.metka.model.Mark;
import ensibs.c4.metka.repository.GroupRepository;
import ensibs.c4.metka.repository.MarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class MarkServiceImpl implements MarkService {

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    MarkRepository markRepository;

    @Override
    public List<Mark> getMarkListFull() {
        return markRepository.findAll();
    }

    @Override
    public List<Mark> getMarkListByGroup(Long groupId) throws ResourceNotFoundException {
        final List<Mark> groupMarkList = markRepository.findAllByGroup_Id(groupId);
        if (groupMarkList.isEmpty()) throw new ResourceNotFoundException();

        return groupMarkList;
    }

    @Override
    public Mark addMarkByGroup(Mark markToPersist, Long groupId) throws ResourceAlreadyExistsException, BadResourceException {
        final Group existingGroup = groupRepository.findById(groupId)
                .orElseThrow(BadResourceException::new);

        markToPersist.setGroup(existingGroup);
        Example<Mark> exampleMark = Example.of(markToPersist);

        if (markRepository.exists(exampleMark))
            throw new ResourceAlreadyExistsException(); // 409 - conflict

        return markRepository.save(markToPersist);
    }

    @Override
    public void changeMark(Mark mark, Long markId) throws ResourceNotFoundException, BadResourceException {
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public void removeMark(Long markId) throws ResourceNotFoundException {
        markRepository.findById(markId).orElseThrow(ResourceNotFoundException::new);

        markRepository.deleteById(markId);
    }
}
