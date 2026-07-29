export interface IncomingChat {
  id: string;
  threads: Thread[];
  users: User[];
  properties: Record<string, Record<string, string>>;
  access: {
    group_ids: number[];
  };
  is_followed: boolean;
}

interface Thread {
  id: string;
  /** ISO string date */
  created_at: string;
  active: boolean;
  user_ids: string[];
  events: Event[];
  properties: Record<string, Record<string, string>>;
  access: {
    group_ids: number[];
  };
  tags: string[];
  previous_thread_id?: string;
};

interface Event {
  id: string;
  /** ISO string date */
  created_at: string;
  visibilty: string; // e.g. "all"
  type: string; // e.g., "filled_form"
  properties: Record<string, Record<string, string>>;
  author_id: string;
  custom_id: string;
  form_id?: string;
  fields?: {
    id: string;
    type: string;
    label: string;
    answer: string;
  }[];
};

interface User {
  id: string;
  name?: string;
  email?: string;
  /** ISO string date */
  events_seen_up_to: string;
  avatar?: string;
  type: string; // e.g., "customer"
  present: boolean;
  /** ISO string date */
  created_at: string;
  visit: {
    /** ISO string date */
    started_at: string;
    /** ISO string date */
    ended_at: string;
    ip: string;
    user_agent: string;
    geolocation: {
      country: string;
      country_code: string;
      region: string;
      city: string;
      timezone: string;
      latitude: string; // e.g., "51.1043015",
      longitude: string; // e.g., "17.0335007"
    };
    last_pages: {
      /** ISO string date */
      opened_at: string;
      url: string;
      title: string;
    }[];
  };
  statistics: {
    chats_count: number;
    threads_count: number;
    visits_count: number;
    page_views_count: number;
    greetings_shown_count: number;
    greetings_accepted_count: number;
    tickets_count: number;
  };
  /** ISO string date */
  agent_last_event_created_at: string;
  /** ISO string date */
  customer_last_event_created_at: string;
  tickets: {
    ticket_id: string;
    /** ISO string date */
    created_at: string;
  }[];
};

export const isIncomingChat = (value: unknown): value is IncomingChat => {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && 'threads' in value && Array.isArray(value.threads) && value.threads.every(isThread);
};

const isThread = (value: unknown): value is Thread => {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && 'created_at' in value && typeof value.created_at === 'string'
    && 'active' in value && typeof value.active === 'boolean'
    && 'user_ids' in value && Array.isArray(value.user_ids) && value.user_ids.every(u => typeof u === 'string')
    && 'events' in value && Array.isArray(value.events) && value.events.every(isEvent);
};

const isEvent = (value: unknown): value is Event => {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && 'created_at' in value && typeof value.created_at === 'string'
    && 'visibilty' in value && typeof value.visibilty === 'string'
    && 'type' in value && typeof value.type === 'string';
};

/*
Example payload:
{
  "id": "PJ0MRSHTDG",
  "threads": [
    {
      "id": "QA37PVJ75B",
      "created_at": "2020-05-12T11:42:47.383000Z",
      "active": false,
      "user_ids": [
        "smith@example.com",
        "b7eff798-f8df-4364-8059-649c35c9ed0c"
      ],
      "events": [
        {
          "id": "QA37PVJ75B_1",
          "created_at": "2020-05-12T11:42:47.383001Z",
          "visibility": "all",
          "type": "filled_form",
          "properties": {
            "property_namespace": {
              "property_name": "property_value"
            }
          },
          "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
          "custom_id": "gh4ocmtv83w",
          "form_id": "1002",
          "fields": [
            {
              "id": "10021",
              "type": "name",
              "label": "Name and Surname:",
              "answer": "Thomas Anderson"
            },
            {
              "id": "10022",
              "type": "email",
              "label": "E-mail:",
              "answer": ""
            }
          ]
        }
      ],
      "properties": {
        "property_namespace": {
          "property_name": "property_value"
        }
      },
      "access": {
        "group_ids": [
          0
        ]
      },
      "tags": [
        "support",
        "positive feedback"
      ],
      "previous_thread_id": "QA078URPJL"
    }
  ],
  "users": [
    {
      "id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
      "name": "Thomas Anderson",
      "events_seen_up_to": "2020-05-12T12:31:46.463000Z",
      "type": "customer",
      "present": true,
      "created_at": "2019-11-02T19:19:50.625101Z",
      "visit": {
        "started_at": "2020-05-12T11:32:03.497479Z",
        "ended_at": "2020-05-12T11:33:33.497000Z",
        "ip": "<customer_ip>",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
        "geolocation": {
          "country": "Poland",
          "country_code": "PL",
          "region": "Dolnoslaskie",
          "city": "Wroclaw",
          "timezone": "Europe/Warsaw",
          "latitude": "51.1043015",
          "longitude": "17.0335007"
        },
        "last_pages": [
          {
            "opened_at": "2020-05-12T11:32:03.497479Z",
            "url": "https://cdn.livechatinc.com/preview/11442778",
            "title": "Sample Page | Preview your chat window"
          }
        ]
      },
      "statistics": {
        "chats_count": 1,
        "threads_count": 3,
        "visits_count": 6,
        "page_views_count": 2,
        "greetings_shown_count": 2,
        "greetings_accepted_count": 1,
        "tickets_count": 12
      },
      "agent_last_event_created_at": "2020-05-12T11:42:47.393002Z",
      "customer_last_event_created_at": "2020-05-12T12:31:46.463000Z",
      "tickets": [
        {
          "ticket_id": "0c04cb99-817a-4935-9d62-137c89a74388",
          "created_at": "2017-10-12T15:19:21.010200Z"
        }
      ]
    },
    {
      "id": "smith@example.com",
      "name": "Agent Smith",
      "email": "smith@example.com",
      "events_seen_up_to": "2020-05-12T12:31:46.999999Z",
      "type": "agent",
      "present": false,
      "avatar": "https://cdn.livechat-files.com/api/file/avatar.png",
      "visibility": "all"
    }
  ],
  "properites": {
    "property_namespace": {
      "property_name": "property_value"
    }
  },
  "access": {
    "group_ids": [
      1,
      2
    ]
  },
  "is_followed": true
}
*/
