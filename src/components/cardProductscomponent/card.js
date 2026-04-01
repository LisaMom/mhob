export const card = ({ images, title, decription }) => {
  return `
  <div class="max-w-md bg-gray-100 rounded-2xl shadow-lg overflow-hidden">
    <!-- Image -->
    <div class="relative">
      <img src="${images}" alt="${title}" class="w-full h-48 object-cover">
      <!-- Label -->
      <p class="absolute bottom-4 left-4 bg-yellow-400 text-black px-4 py-1 rounded-full font-semibold">  ម្ហូប</p>
      <!-- Heart -->
      <div class="absolute top-4 right-4 bg-white rounded-full p-2 shadow text-pink-700 ">
        <!-- Bookmark go to favorite -->
        <a href=".......">
        <button class="active:bg-pink-200"> <i class="fa-regular fa-heart"> </i></button>
        </a>
       </div>
       </div>
    <!-- Content -->
    <div class="p-6">
      <!-- Title -->
      <h2 class="text-2xl font-bold mb-2">
     ${title}
      </h2>
      <!-- Description -->
      <p class="text-gray-500 mb-4">
      ${decription}
      </p>
      <!-- Bottom -->
      <div class="flex items-center justify-between">
        <!-- Time + Stars -->
        <div class="flex items-center gap-2 text-yellow-400">
          <span class="text-gray-700"> <i  class="fa-regular fa-clock"></i> 30នាទី</span>
          <a class="hover:text-yellow-300 ">
                <i class="fa-regular fa-star"></i> 
                <i class="fa-regular fa-star"></i> 
                <i class="fa-regular fa-star"></i>  
                <i class="fa-regular fa-star"></i>
                 <i class="fa-regular fa-star"></i>
          </a>
            </div>
        <!-- Button -->
         <!-- button go to recipe -->
         <a href="">
        <button class="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full">
          មើលរូបមន្ត
        </button>
         </a>
      </div>
    </div>
  </div>
  `;
};
