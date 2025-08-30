import { Data } from "effect";
import { publishDomainEvent } from "../../services/domain-events/publisher";
import { RolesCollection } from "../types";

export interface RolesRegisteredDomainEvent {
  _tag: "RolesRegisteredDomainEvent";
  appId: string;
  roleNames: string[];
}

export interface UserRolesUpdatedDomainEvent {
  _tag: "UserRolesUpdatedDomainEvent";
  userId: string;
  roles: RolesCollection;
}

export const RolesRegisteredDomainEvent =
  Data.tagged<RolesRegisteredDomainEvent>("RolesRegisteredDomainEvent");

export const UserRolesUpdatedDomainEvent =
  Data.tagged<UserRolesUpdatedDomainEvent>("UserRolesUpdatedDomainEvent");

export const publishRolesRegisteredDomainEvent = (
  rolesRegisteredDomainEvent: RolesRegisteredDomainEvent
) => publishDomainEvent(rolesRegisteredDomainEvent);

export const publishUserRolesUpdatedDomainEvent = (
  userRolesUpdatedDomainEvent: UserRolesUpdatedDomainEvent
) => publishDomainEvent(userRolesUpdatedDomainEvent);
