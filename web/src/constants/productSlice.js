import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: 'product',
    initialState: {value: [
        {
            id: 1,
            imageUrl: "../assets/red-hat.jpg",
            productName: ["reddest", "barrette"],
            productDescription:
              "A fabulous red barret designed and made in France. Channel your inner french girl aesthetic with this hat",
            price: 30.99,
            discount: 5,
            dateAdded: '9-11-1990',
            productRating: 4,
            reviews: [
              {
                name: "S",
                date: '3-5-2014',
                rating: 5,
                review: "It's good",
              },
              {
                name: "Anonymous",
                date: '4-6-2022',
                rating: 2,
                review: "It's garbage",
              },
              {
                name: "Tim",
                date: '6-4-2002',
                rating: 4,
                review: "It's maroon, not red. Still pretty cute though.",
              },
            ],
          },
          {
            id: 2,
            imageUrl: "./blue-vase.jpg",
            productName: ["bluest", "vase"],
            productDescription:
              "A fabulous blue vase",
            price: 20.99,
            discount: 5,
            dateAdded: '4-7-2015',
            productRating: 4,
            reviews: [
              {
                name: "S",
                date: '1-1-1991',
                rating: 5,
                review: "It's good",
              },
              {
                name: "Anonymous",
                date: '6-8-2022',
                rating: 2,
                review: "It's garbage",
              },
              {
                name: "Tim",
                date: '7-9-2002',
                rating: 4,
                review: "It's maroon, not red. Still pretty cute though.",
              },
            ],
          }
    ]},
    reducers: {
        updateProduct: (state,action) => {

            state.value = action.payload
        },
    },
})

export const {updateProduct} = productSlice.actions
export default productSlice.reducer