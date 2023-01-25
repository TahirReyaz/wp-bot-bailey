import axios, { AxiosResponse } from "axios";
import { config } from "dotenv";
config();

import {
  grpArrayItem,
  grpPerms,
  updateGrpPermissions,
} from "../../data/grpData";
import {
  Reply,
  updateDefaultReply,
  updateReplies,
} from "../../data/personalData";

export const fetchData = async () => {
  // Group data
  try {
    const { data: botData }: AxiosResponse = await axios.get(
      `${process.env.FIREBASE_DOMAIN}/grpData.json`
    );

    if (!botData) {
      console.log("No group data found");
      return;
    }

    const { grpPermissions, grpRoles } = botData;
    const tagAllGrps: grpArrayItem[] = [],
      tagAllAdminOnlyGrps: grpArrayItem[] = [],
      roastGrps: grpArrayItem[] = [],
      nsfwAnimeDetailsGrps: grpArrayItem[] = [];

    if (grpPermissions?.tagAll) {
      for (const key in grpPermissions.tagAll) {
        tagAllGrps.push({
          grpId: grpPermissions.tagAll[key].grpId,
          firebaseId: key,
        });
      }
      updateGrpPermissions(grpPerms.tagAll, tagAllGrps);
    }
    if (grpPermissions?.tagAllAdminOnly) {
      for (const key in grpPermissions.tagAllAdminOnly) {
        tagAllAdminOnlyGrps.push({
          grpId: grpPermissions.tagAllAdminOnly[key].grpId,
          firebaseId: key,
        });
      }
      updateGrpPermissions(grpPerms.tagAllAdminOnly, tagAllAdminOnlyGrps);
    }
    if (grpPermissions?.roast) {
      for (const key in grpPermissions.roast) {
        roastGrps.push({
          grpId: grpPermissions.roast[key].grpId,
          firebaseId: key,
        });
      }
      updateGrpPermissions(grpPerms.roast, roastGrps);
    }
    if (grpPermissions?.nsfwAnimeDetails) {
      for (const key in grpPermissions.nsfwAnimeDetails) {
        nsfwAnimeDetailsGrps.push({
          grpId: grpPermissions.nsfwAnimeDetails[key].grpId,
          firebaseId: key,
        });
      }
      updateGrpPermissions(grpPerms.nsfwAnimeDetails, nsfwAnimeDetailsGrps);
    }
  } catch (err) {
    console.log({ err });
  }

  // Personal data
  try {
    const { data: botData }: AxiosResponse = await axios.get(
      `${process.env.FIREBASE_DOMAIN}/personal.json`
    );

    if (!botData) {
      console.log("No personal data found");
      return;
    }

    const { defaultReply, replies } = botData;

    if (defaultReply?.length > 0) {
      updateDefaultReply(defaultReply);
    }
    if (replies) {
      const newReplies: Reply[] = [];

      for (const key in replies) {
        newReplies.push({
          id: replies[key].id,
          reply: replies[key].reply,
          firebaseId: key,
        });
      }
      updateReplies(newReplies);
    }
  } catch (err) {
    console.log({ err });
  }
};
