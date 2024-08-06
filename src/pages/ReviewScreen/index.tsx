import ProductReview from "@/components/ProductReview";
import Review from "@/components/Review";

const ReviewScreen = () => {
  return (
    <div className="bg-[#EFF2F6] h-screen">
      <div className="flex justify-between pt-[111px]">
        <Review />
        <div className="flex-col mr-[167px]">
          <div className="mt-[133px]">
            <ProductReview
              starCount={5}
              text={
                "It was a gift for a friend and she completely loved it and her warm and stylish she could wear it with almost everything that she has in her wardrobe. She uses it for many things including hiking and put it through the test of actual outdoors being involved in her purchase. And whenever she doesn&#39;t use it for the outdoors she uses it casually. which is a great alternative for her because she likes to be diversified in her closet."
              }
            />
          </div>
          <div className="mt-[39px]">
            <ProductReview
              starCount={3}
              text={
                "Have been buying the Denali since the first ones, and personally own 3. I want A new one, white with the gray in xxl. Not interested in cream and black. Pluck the length is shorter."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewScreen;
