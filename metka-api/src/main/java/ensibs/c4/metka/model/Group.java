package ensibs.c4.metka.model;

import com.google.gson.annotations.Expose;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "student_group")
public class Group {

    @Expose
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Expose
    @Column(name = "name", length = 32)
    private String name;

    @OneToMany(mappedBy = "group", fetch = FetchType.LAZY)
    private List<Marker> markerList;
}
