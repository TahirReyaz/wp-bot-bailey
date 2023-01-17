import axios, { AxiosResponse } from "axios";
import { config } from "dotenv";
config();

import { grpArrayItem, updateGrpPermissions } from "../../data/grpData";

export const fetchData = async () => {
  try {
    const { data: botData }: AxiosResponse = await axios.get(
      `${process.env.FIREBASE_DOMAIN}/grpData.json`
    );

    const { grpPermissions, grpRoles } = botData;
    const tagAllGrps: grpArrayItem[] = [],
      tagAllAdminOnlyGrps: grpArrayItem[] = [],
      roastGrps: grpArrayItem[] = [];

    if (grpPermissions?.tagAll) {
      for (const key in grpPermissions.tagAll) {
        tagAllGrps.push({
          grpId: grpPermissions.tagAll[key].grpId,
          firebaseId: key,
        });
      }
      updateGrpPermissions("tagAll", tagAllGrps);
    }
    if (grpPermissions?.tagAllAdminOnly) {
      for (const key in grpPermissions.tagAllAdminOnly) {
        tagAllAdminOnlyGrps.push({
          grpId: grpPermissions.tagAllAdminOnly[key].grpId,
          firebaseId: key,
        });
      }
      updateGrpPermissions("tagAllAdminOnly", tagAllAdminOnlyGrps);
    }
    if (grpPermissions?.roast) {
      for (const key in grpPermissions.roast) {
        roastGrps.push({
          grpId: grpPermissions.roast[key].grpId,
          firebaseId: key,
        });
      }
      updateGrpPermissions("roast", roastGrps);
    }
  } catch (err) {
    console.log({ err });
  }
};
