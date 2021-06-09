package ensibs.c4.metka.model;

import com.google.gson.annotations.Expose;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

// Build & test annotations
@Builder
@AllArgsConstructor
@NoArgsConstructor
// Default annotations
@Data
@Entity
@Table(name = "marker")
public class Marker {

    @Expose
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Expose
    @Column(name = "latitude")
    private double lat;

    @Expose
    @Column(name = "longitude")
    private double lng;

    @Expose
    @Column(name = "assumed_creation_date")
    private Date mrkdate;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "studgroup_id")
    private Group studgroup;
}


