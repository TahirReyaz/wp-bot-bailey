import axios, { AxiosResponse } from "axios";
import { config } from "dotenv";
config();

export const fetchData = async () => {
  let tagAllGrps: string[] = [],
    tagAllAdminOnlyGrps: string[] = [],
    roastGrps: string[] = [];
  try {
    const { data: botData }: AxiosResponse = await axios.get(
      `${process.env.FIREBASE_DOMAIN}/grpData.json`
    );
    const { grpPermissions, grpRoles } = botData;
    for (const key in grpPermissions.tagAll) {
      tagAllGrps.push(grpPermissions.tagAll[key].grpId);
    }
    for (const key in grpPermissions.tagAllAdminOnly) {
      tagAllAdminOnlyGrps.push(grpPermissions.tagAllAdminOnly[key].grpId);
    }
    for (const key in grpPermissions.roast) {
      roastGrps.push(grpPermissions.roast[key].grpId);
    }
  } catch (err) {
    console.log({ err });
  }
  return { tagAllGrps, tagAllAdminOnlyGrps, roastGrps };
};
