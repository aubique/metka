package ensibs.c4.metka.model;

import com.google.gson.annotations.Expose;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "studgroup")
public class Group {

    @Expose
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Expose
    @Column(name = "groupname", length = 32)
    private String groupname;

    @OneToMany(mappedBy = "studgroup", fetch = FetchType.LAZY)
    private List<Marker> markerList;
}
