package ensibs.c4.metka.model;

import lombok.*;

import javax.persistence.*;

// Build & test annotations
@Builder
@AllArgsConstructor
@NoArgsConstructor
// Default annotations
@Data
@Entity
@Table(name = "mark")
public class Mark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "latitude")
    private float lat;

    @Column(name = "longitude")
    private float lng;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;
}


