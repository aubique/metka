package ensibs.c4.metka.repository;

import ensibs.c4.metka.model.Marker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarkRepository extends JpaRepository<Marker, Long> {

    List<Marker> findAllByGroup_Id(Long groupId);

    //TODO: findByDate
}
