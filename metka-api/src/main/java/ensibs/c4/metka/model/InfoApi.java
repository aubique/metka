package ensibs.c4.metka.model;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class InfoApi {

    @Expose
    Date infoDate;

    @Expose
    Marker initialMarker;

    @Expose
    List<Group> groupList;
}
