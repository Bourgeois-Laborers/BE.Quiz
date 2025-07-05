export enum Status {
  PENDING = 'PENDING',
  EXECUTING = 'EXECUTING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export const availableNextStatuses = {
  [Status.PENDING]: [Status.EXECUTING, Status.CANCELED],
  [Status.EXECUTING]: [Status.PAUSED, Status.COMPLETED, Status.CANCELED],
  [Status.PAUSED]: [Status.EXECUTING, Status.CANCELED],
  [Status.COMPLETED]: [],
  [Status.CANCELED]: [],
};

export const getAvailableNextStatuses = (status: Status): Status[] => {
  return availableNextStatuses[status];
};
