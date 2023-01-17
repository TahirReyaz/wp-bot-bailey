export interface grpArrayItem {
  grpId: string;
  firebaseId: string;
}

export interface GrpPermissions {
  tagAll: grpArrayItem[];
  tagAllAdminOnly: grpArrayItem[];
  roast: grpArrayItem[];
}

interface GrpData {
  grpPermissions: GrpPermissions;
  grpRoles: any[];
}

export const grpData: GrpData = {
  grpPermissions: {
    tagAll: [],
    tagAllAdminOnly: [],
    roast: [],
  },
  grpRoles: [],
};

export const updateGrpPermissions = (
  permission: string,
  updatedPermission: grpArrayItem[]
) => {
  grpData.grpPermissions[permission as keyof GrpPermissions] =
    updatedPermission;
};
