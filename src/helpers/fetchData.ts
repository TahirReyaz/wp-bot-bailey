import axios, { AxiosResponse } from "axios";
import { config } from "dotenv";
config();

export interface grpArrayItem {
  grpId: string;
  firebaseId: string;
}

export const fetchData = async () => {
  let tagAllGrps: grpArrayItem[] = [],
    tagAllAdminOnlyGrps: grpArrayItem[] = [],
    roastGrps: grpArrayItem[] = [];
  try {
    const { data: botData }: AxiosResponse = await axios.get(
      `${process.env.FIREBASE_DOMAIN}/grpData.json`
    );

    const { grpPermissions, grpRoles } = botData;
    if (grpPermissions?.tagAll) {
      for (const key in grpPermissions.tagAll) {
        tagAllGrps.push({
          grpId: grpPermissions.tagAll[key].grpId,
          firebaseId: key,
        });
      }
    }
    if (grpPermissions?.tagAllAdminOnly) {
      for (const key in grpPermissions.tagAllAdminOnly) {
        tagAllAdminOnlyGrps.push({
          grpId: grpPermissions.tagAllAdminOnly[key].grpId,
          firebaseId: key,
        });
      }
    }
    if (grpPermissions?.roast) {
      for (const key in grpPermissions.roast) {
        roastGrps.push({
          grpId: grpPermissions.roast[key].grpId,
          firebaseId: key,
        });
      }
    }
  } catch (err) {
    console.log({ err });
  }
  return { tagAllGrps, tagAllAdminOnlyGrps, roastGrps };
};
