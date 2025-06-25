export enum Status {
  New = 'New',
  Active = 'Active',
  Paused = 'Paused',
  Finished = 'Finished',
}

export const availableNextStatuses = {
  [Status.New]: [Status.Active],
  [Status.Active]: [Status.Paused, Status.Finished],
  [Status.Paused]: [Status.Active, Status.Finished],
  [Status.Finished]: [],
};

export const getAvailableNextStatuses = (status: Status): Status[] => {
  return availableNextStatuses[status];
};
