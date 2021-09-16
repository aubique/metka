package ensibs.c4.metka.repository;

import ensibs.c4.metka.model.Marker;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarkerRepository extends JpaRepository<Marker, Long> {

    List<Marker> findAllByStudgroup_Id(Long groupId);

    List<Marker> findAllByStudgroup_IdOrderByIdDesc(Long groupId);
}
