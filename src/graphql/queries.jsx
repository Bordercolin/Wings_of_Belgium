import { gql } from "@apollo/client";

export const GET_USER_INFO = gql`
  query GetAllUserInfo($email: String!) {
    player(where: { email: $email }) {
      id
      level
      username
      email
      wins
      losses
      experience
      avatars {
        id
        image {
          url
          id
        }
      }
      maxExperience
      settingsPlayer {
        setting {
          settings
          id
        }
        id
      }
      activePlayerAvatar {
        id
        avatar {
          image {
            url
            id
          }
        }
      }
      unlockedPlayerBadge {
        id
        badges {
          id
          image {
            url
          }
        }
      }
      rankPlayer {
        rank {
          name
          image {
            url
          }
        }
      }
      unlockedPlayerAvatar {
        id
        avatars {
          id
          image {
            id
            url
          }
        }
      }
    }
  }
`;

export const GET_ALL_NEWS = gql`
  query GetAllNews {
    newsItems {
      date
      id
      imageUrl
      link
      title
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    players {
      id
      username
      email
      password
    }
  }
`;

export const GET_ALL_MISSIONS = gql`
  query get_all_missions($id: ID!) {
    missions(where: { id: $id }) {
      id
      briefing
      header
      title
      description
      image {
        url
      }
    }
  }
`;

export const GET_ALL_TEAMROLES = gql`
  query GetAllTeamRoles {
    teamRoles {
      category
      image {
        url
      }
      isPartOfTeam
      name
      id
    }
  }
`;

export const GET_ALL_BADGES = gql`
  query GetAllBadges {
    badges {
      id
      image {
        url
      }
    }
  }
`;

export const GET_ALL_AVATARS = gql`
  query GetAllAvatars {
    avatars {
      id
    }
  }
`;

export const GET_ALL_RANKS = gql`
  query GetAllRanks {
    ranks {
      id
    }
  }
`;
