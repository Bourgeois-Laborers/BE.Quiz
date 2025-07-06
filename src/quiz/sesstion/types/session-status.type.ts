import { SessionStatus } from '../../../../prisma/prisma/client';

export { SessionStatus };

export const availableNextStatuses = {
  [SessionStatus.OPEN]: [SessionStatus.LIVE, SessionStatus.CLOSED],
  [SessionStatus.LIVE]: [SessionStatus.CLOSED],
  [SessionStatus.CLOSED]: [],
};

export const getAvailableNextStatuses = (
  status: SessionStatus,
): SessionStatus[] => {
  return availableNextStatuses[status];
};
