import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!
    $email: String!
    $password: String!
    $birthday: Date!
    $settings: Json!
    $firstAvatarId: ID!
    $avatarIds: [AvatarWhereUniqueInput!]!
    $rankId: ID!
  ) {
    createPlayer(
      data: {
        username: $username
        email: $email
        password: $password
        birthday: $birthday
        level: 1
        experience: 0
        wins: 0
        losses: 0
        maxExperience: 100
        rankPlayer: {
          create: {
            player: { connect: { email: $email } }
            rank: { connect: { id: $rankId } }
          }
        }
        settingsPlayer: {
          create: {
            setting: { create: { settings: $settings } }
            player: { connect: { email: $email } }
          }
        }
        unlockedPlayerAvatar: {
          create: {
            player: { connect: { email: $email } }
            avatars: { connect: { id: $firstAvatarId } }
          }
        }
        unlockedPlayerBadge: {
          create: { player: { connect: { email: $email } } }
        }
        activePlayerAvatar: {
          create: {
            player: { connect: { email: $email } }
            avatar: { connect: { id: $firstAvatarId } }
          }
        }
        avatars: { connect: $avatarIds }
      }
    ) {
      username
      email
      birthday
      level
      experience
      rankPlayer {
        id
      }
      settingsPlayer {
        id
        setting {
          id
        }
      }
      unlockedPlayerAvatar {
        id
      }
      unlockedPlayerBadge {
        id
      }
      activePlayerAvatar {
        id
      }
    }
  }
`;

export const PUBLISH_PLAYER = gql`
  mutation PublishPlayer(
    $email: String!
    $activePlayerAvatarId: ID!
    $rankId: ID!
    $settingsId: ID!
    $settingsPlayerId: ID!
    $unlockedPlayerAvatarId: ID!
    $unlockedPlayerBadgeId: ID!
  ) {
    publishPlayer(where: { email: $email }) {
      id
    }
    publishActivePlayerAvatar(where: { id: $activePlayerAvatarId }) {
      id
    }
    publishRankPlayer(where: { id: $rankId }) {
      id
    }
    publishSettingsPlayer(where: { id: $settingsPlayerId }) {
      id
    }
    publishSetting(where: { id: $settingsId }) {
      id
    }
    publishUnlockedPlayerAvatar(where: { id: $unlockedPlayerAvatarId }) {
      id
    }
    publishUnlockedPlayerBadge(where: { id: $unlockedPlayerBadgeId }) {
      id
    }
  }
`;

export const UPDATE_USERNAME = gql`
  mutation updateUsername($username: String!, $email: String!) {
    updatePlayer(data: { username: $username }, where: { email: $email }) {
      id
      username
    }
    publishPlayer(where: { email: $email }) {
      id
    }
  }
`;

export const UPDATE_PLAYER_AVATAR = gql`
  mutation updateActivePlayerAvatar($id: ID!, $avatarId: ID!) {
    updateActivePlayerAvatar(
      where: { id: $id }
      data: { avatar: { connect: { id: $avatarId } } }
    ) {
      id
      avatar {
        id
        image {
          url
        }
      }
      player {
        activePlayerAvatar {
          id
          avatar {
            image {
              url
              id
            }
          }
        }
      }
    }
    publishActivePlayerAvatar(where: { id: $id }) {
      id
    }
  }
`;

export const UPDATE_PLAYER_SETTINGS = gql`
  mutation UpdateSettingsPlayer(
    $settingsPlayerId: ID!
    $newSettings: Json!
    $settingsId: ID!
  ) {
    updateSettingsPlayer(
      where: { id: $settingsPlayerId }
      data: {
        setting: {
          update: {
            data: { settings: $newSettings }
            where: { id: $settingsId }
          }
        }
      }
    ) {
      id
      player {
        settingsPlayer {
          setting {
            settings
            id
          }
          id
        }
      }
    }
    publishSettingsPlayer(where: { id: $settingsPlayerId }) {
      id
      player {
        email
      }
    }
    publishSetting(where: { id: $settingsId }) {
      id
      settings
    }
  }
`;

export const UPDATE_PLAYER_LOSSES = gql`
  mutation updateLosses($email: String!, $losses: Int!) {
    updatePlayer(data: { losses: $losses }, where: { email: $email }) {
      losses
    }
    publishPlayer(where: { email: $email }) {
      losses
    }
  }
`;

export const UPDATE_PLAYER_WINS = gql`
  mutation updateWins($email: String!, $wins: Int!, $experience: Int!) {
    updatePlayer(
      data: { wins: $wins, experience: $experience }
      where: { email: $email }
    ) {
      wins
      experience
    }
    publishPlayer(where: { email: $email }) {
      wins
      experience
    }
  }
`;

export const UPDATE_PLAYER_WINS_LEVEL_UP = gql`
  mutation updateWinsLevelUp(
    $email: String!
    $wins: Int!
    $experience: Int!
    $level: Int!
    $maxExperience: Int!
  ) {
    updatePlayer(
      data: {
        wins: $wins
        experience: $experience
        level: $level
        maxExperience: $maxExperience
      }
      where: { email: $email }
    ) {
      wins
      experience
      maxExperience
      level
    }
    publishPlayer(where: { email: $email }) {
      wins
      experience
      level
      maxExperience
    }
  }
`;

export const UPDATE_UNLOCKED_BADGES = gql`
  mutation updateUnlockedBadges($badgeId: ID!, $playerBadgeId: ID!) {
    updateUnlockedPlayerBadge(
      data: { badges: { connect: { where: { id: $badgeId } } }, unlocked: true }
      where: { id: $playerBadgeId }
    ) {
      player {
        unlockedPlayerBadge {
          id
          unlocked
          badges {
            id
            image {
              url
            }
          }
        }
      }
    }
    publishUnlockedPlayerBadge(where: { id: $playerBadgeId }) {
      id
    }
  }
`;

export const UPDATE_UNLOCKED_AVATARS = gql`
  mutation updateUnlockedAvatars($avatarId: ID!, $playerAvatarId: ID!) {
    updateUnlockedPlayerAvatar(
      data: { avatars: { connect: { where: { id: $avatarId } } } }
      where: { id: $playerAvatarId }
    ) {
      player {
        unlockedPlayerAvatar {
          id
          avatars {
            id
            image {
              url
            }
          }
        }
      }
    }
    publishUnlockedPlayerAvatar(where: { id: $playerAvatarId }) {
      id
    }
  }
`;
