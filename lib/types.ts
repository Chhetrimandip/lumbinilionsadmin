export type BlogsType = {
    id: string;
    title: string;
    slug: string;
    content: string;
    imageUrl: string | null;
    author: string;
    publishedAt: Date;
    // Add any other fields from your BlogPost model
  }[];