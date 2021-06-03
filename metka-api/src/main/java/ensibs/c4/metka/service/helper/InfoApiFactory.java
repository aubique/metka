package ensibs.c4.metka.service.helper;

import ensibs.c4.metka.model.Group;
import ensibs.c4.metka.model.InfoApi;
import ensibs.c4.metka.model.Marker;

import java.util.Date;
import java.util.List;

public class InfoApiFactory {

    private static final double LATITUDE = 47.644605;
    private static final double LONGITUDE = -2.748413;
//  private static final int NUMBER_OF_GROUPS = 10;
//  private static String GROUP_NAME_PATTERN = "Group №";

    public static Marker createInitialMarker() {
        return new Marker(0L, LATITUDE, LONGITUDE, null, null);
    }

    public static InfoApi newInstance(List<Group> groupList) {
        return new InfoApi(new Date(), createInitialMarker(), groupList);
    }
}
