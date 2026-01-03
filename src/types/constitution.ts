/**
 * Constitution data types
 */

export interface Article {
  id: string;
  title: string;
  content: string;
  section?: string;
  version?: string;
  amendments?: Amendment[];
}

export interface Amendment {
  id: string | number;
  articleId?: string;
  title: string;
  proposal?: string;
  status: "open" | "passed" | "rejected";
  proposer?: string;
  votesFor?: number;
  votesAgainst?: number;
  createdAt?: string;
  effectiveDate?: string;
  link?: string;
}

export interface DApp {
  name: string;
  repo: string;
  articles: string[];
  status: string;
  lastChecked?: string;
  compliance?: boolean;
  issues?: string[];
}
