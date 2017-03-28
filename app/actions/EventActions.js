import { eventSchema, registrationSchema } from 'app/reducers';
import createQueryString from 'app/utils/createQueryString';
import callAPI from 'app/actions/callAPI';
import { Event } from './ActionTypes';
import { addNotification } from 'app/actions/NotificationActions';

export function fetchEvent(eventId) {
  return callAPI({
    types: Event.FETCH,
    endpoint: `/events/${eventId}/`,
    schema: eventSchema,
    meta: {
      errorMessage: 'Fetching event failed'
    }
  });
}

export function fetchAll({ dateAfter, dateBefore } = {}) {
  return callAPI({
    types: Event.FETCH,
    endpoint: `/events/${createQueryString({
      date_after: dateAfter,
      date_before: dateBefore
    })}`,
    schema: [eventSchema],
    meta: {
      errorMessage: 'Fetching events failed'
    }
  });
}

export function fetchRegistrationList(eventId) {
  return callAPI({
    types: Event.FETCH,
    endpoint: `/events/${eventId}/registrations/`,
    schema: [registrationSchema],
    meta: {
      errorMessage: 'Fetching registrations failed'
    }
  });
}

export function register(eventId, captchaResponse, feedback) {
  return callAPI({
    types: Event.REGISTER,
    endpoint: `/events/${eventId}/registrations/`,
    method: 'post',
    body: {
      captchaResponse,
      feedback
    },
    meta: {
      id: eventId,
      errorMessage: 'Registering to event failed'
    }
  });
}

export function unregister(eventId, registrationId, admin = false) {
  return callAPI({
    types: Event.UNREGISTER,
    endpoint: `/events/${eventId}/registrations/${registrationId}/`,
    method: 'delete',
    body: {},
    meta: {
      errorMessage: 'Unregistering from event failed',
      admin,
      id: Number(registrationId)
    }
  });
}

export function payment(eventId, token) {
  return callAPI({
    types: Event.PAYMENT_QUEUE,
    endpoint: `/events/${eventId}/payment/`,
    method: 'post',
    body: {
      token
    },
    meta: {
      errorMessage: 'Payment failed'
    }
  });
}

export function updateFeedback(eventId, registrationId, feedback) {
  return dispatch => {
    dispatch(
      callAPI({
        types: Event.UPDATE_REGISTRATION,
        endpoint: `/events/${eventId}/registrations/${registrationId}/`,
        method: 'PATCH',
        body: {
          feedback
        },
        meta: {
          errorMessage: 'Feedback update failed'
        }
      })
    ).then(() => dispatch(addNotification({ message: 'Feedback updated' })));
  };
}

export function updatePresence(eventId, registrationId, presence) {
  return dispatch => {
    dispatch(
      callAPI({
        types: Event.UPDATE_REGISTRATION,
        endpoint: `/events/${eventId}/registrations/${registrationId}/`,
        method: 'PATCH',
        body: {
          presence
        },
        meta: {
          errorMessage: 'Presence update failed'
        }
      })
    ).then(() => dispatch(addNotification({ message: 'Presence updated' })));
  };
}
