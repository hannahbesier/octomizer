export type State = {
  currentExpanded: number[];
  explorerContent: number;
  isAuth: boolean;
  user: User;
};
export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
} | undefined;
export type BoardIssue = {
  id: number;
  name: string;
  assignedTo: { name: string };
};
export type Board = {
  id: number;
  name: string;
  issues: BoardIssue[];
};
export type Issue = {
  id: number;
  name: string;
  storypoints: number;
  markdown: string;
  stateId: number | null;
  createdById: number | null;
  assignedToId: number | null;
  projectId: number | null;
  featureId: number | null;
  tags: { id: number; name: string }[];
};

export type UpdateIssueRequest = {
  id: number;
  name?: string;
  storypoints?: number;
  markdown?: string;
  stateId?: number | null;
  createdById?: number | null;
  assignedToId?: number | null;
  projectId?: number | null;
  featureId?: number | null;
  tags?: (number | undefined)[];
};
export type ProjectData = {
  name: string;
  id: number;
  issues: IssueTable[];
  features: FeatureTable[];
};

export type IssueTable = {
  id: number;
  name: string;
  assignedTo: Record<string, string>;
  state: Record<string, string>;
  open: boolean;
};
export type FeatureTable = {
  id: number;
  name: string;
};
export type IssueData = {
  tags:
    | {
        id: number;
        name: string;
      }[]
    | undefined;
  id: number;
  name: string;
  state:
    | {
        id: number;
        name: string;
      }
    | undefined;
  assignedTo:
    | {
        id: number;
        name: string;
      }
    | undefined;
  project:
    | {
        id: number;
        name: string;
      }
    | undefined;
  storypoints: number | undefined;
  markdown: string | undefined;
  feature:
    | {
        id: number;
        name: string;
      }
    | undefined;
};
