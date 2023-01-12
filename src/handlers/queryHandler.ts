export const queryHandler = (command: string) => {
  const queryArray = command.split(" ");
  queryArray[0] = queryArray[0].toLowerCase();
  const queryCutter = queryArray[0] + " ";
  const queryWithDesc = command.substring(queryCutter.length).split("\n"); // Get everything written after the command
  let query = queryWithDesc[0]; // This is used as the option people type after the command
  const queryPart = query.split("-"); // This is used as extra options that people type after the above query
  return { queryArray, queryWithDesc, query, queryPart };
};
