import dbConnect from '../../../../../config/db';
import PostItem from '../../../../../models/PostItem';

dbConnect();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const postItem = await PostItem.findById(id).select('-__v');
    return Response.json(postItem);
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'No item Found for this ID' }),
      { status: 404 }
    );
  }
}