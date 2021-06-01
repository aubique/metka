package ensibs.c4.metka.model;

import com.google.gson.annotations.Expose;
import lombok.*;

import javax.persistence.*;

// Build & test annotations
@Builder
@AllArgsConstructor
@NoArgsConstructor
// Default annotations
@Data
@Entity
@Table(name = "marker")
public class Marker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Expose
    @Column(name = "latitude")
    private float lat;

    @Expose
    @Column(name = "longitude")
    private float lng;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "studgroup_id")
    private Group studgroup;
}


