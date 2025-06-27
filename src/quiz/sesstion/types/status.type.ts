export enum Status {
  Open = 'Open',
  Live = 'Live',
  Closed = 'Closed',
}

export const availableNextStatuses = {
  [Status.Open]: [Status.Live, Status.Closed],
  [Status.Live]: [Status.Closed],
  [Status.Closed]: [],
};

export const getAvailableNextStatuses = (status: Status): Status[] => {
  return availableNextStatuses[status];
};
