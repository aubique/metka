package ensibs.c4.metka.service;

import ensibs.c4.metka.exception.BadResourceException;
import ensibs.c4.metka.exception.ResourceAlreadyExistsException;
import ensibs.c4.metka.exception.ResourceNotFoundException;
import ensibs.c4.metka.model.Group;
import ensibs.c4.metka.model.Marker;
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
    public List<Marker> getMarkListFull() {
        return markRepository.findAll();
    }

    @Override
    public List<Marker> getMarkListByGroup(Long groupId) throws ResourceNotFoundException {
        final List<Marker> groupMarkerList = markRepository.findAllByGroup_Id(groupId);
        if (groupMarkerList.isEmpty()) throw new ResourceNotFoundException();

        return groupMarkerList;
    }

    @Override
    public Marker addMarkByGroup(Marker markerToPersist, Long groupId) throws ResourceAlreadyExistsException, BadResourceException {
        final Group existingGroup = groupRepository.findById(groupId)
                .orElseThrow(BadResourceException::new);

        markerToPersist.setGroup(existingGroup);
        Example<Marker> exampleMark = Example.of(markerToPersist);

        if (markRepository.exists(exampleMark))
            throw new ResourceAlreadyExistsException(); // 409 - conflict

        return markRepository.save(markerToPersist);
    }

    @Override
    public void changeMark(Marker marker, Long markId) throws ResourceNotFoundException, BadResourceException {
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public void removeMark(Long markId) throws ResourceNotFoundException {
        markRepository.findById(markId).orElseThrow(ResourceNotFoundException::new);

        markRepository.deleteById(markId);
    }
}
