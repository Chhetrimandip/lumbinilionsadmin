import GalleryClientPage from '../components/GalleryClientPage';
import { prisma } from "@/lib/db";

// Set revalidation time - gallery might update a few times per week
export const revalidate = 172800; // 48 hours

export default async function GalleryPage() {
  // Fetch gallery data server-side
  let galleryImages = [];
  
  try {
    galleryImages = await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
  }
  
  return <GalleryClientPage initialImages={galleryImages} />;
}