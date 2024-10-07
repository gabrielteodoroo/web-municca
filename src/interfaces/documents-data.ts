export interface DocumentsData {
  id: string;
  name: string;
  status: string;
  userId: string;
}

export interface DocumetsResponse {
  data: DocumentsData[];
}
