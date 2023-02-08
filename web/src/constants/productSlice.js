import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    value: [
      {
        id: 1,
        imageUrl: "https://abracadabra-app.s3.us-west-2.amazonaws.com/red-hat.jpg",
        tags: ["red", "barrette"],
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
            name: "Timmy",
            date: '6-7-2002',
            rating: 4,
            review: "It's maroon, not red. Still pretty cute though.",
          },
        ],
      },
      {
        id: 2,
        imageUrl: "https://abracadabra-app.s3.us-west-2.amazonaws.com/blue-vase.jpg",
        tags: ["blue", "vase"],
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
      },
      {
        id: 3,
        imageUrl: "https://abracadabra-app.s3.us-west-2.amazonaws.com/beige-suit.jpeg",
        tags: ["beige", "suit"],
        productDescription:
          "A fabulous beige suit designed and made in France. Channel your inner french girl aesthetic with this hat",
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
            date: '4-9-2022',
            rating: 2,
            review: "It's garbage",
          },
          {
            name: "Tim",
            date: '6-4-2012',
            rating: 4,
            review: "It's maroon, not red. Still pretty cute though.",
          },
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
            name: "Timothy",
            date: '6-21-2022',
            rating: 4,
            review: "It's maroon, not red. Still pretty cute though.",
          },
        ],
      },
      {
        id: 4,
        imageUrl: "https://abracadabra-app.s3.us-west-2.amazonaws.com/bucket-hat.jpeg",
        tags: ["bucket", "hat"],
        productDescription:
          "A fabulous bucket hat",
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
      },
      {
        id: 5,
        imageUrl: "https://abracadabra-app.s3.us-west-2.amazonaws.com/combat-boots.jpeg",
        tags: ["bluest", "vase"],
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
      },
      {
        id: 6,
        imageUrl: "https://abracadabra-app.s3.us-west-2.amazonaws.com/fishnet-tights.jpeg",
        tags: ["fishnet", "tights"],
        productDescription:
          "A fabulous red barret designed and made in France. Channel your inner french girl aesthetic with this hat",
        price: 11.29,
        discount: 30,
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
            date: '3-4-2002',
            rating: 4,
            review: "It's maroon, not red. Still pretty cute though.",
          },
        ],
      },
      {
        id: 7,
        imageUrl: "https://abracadabra-app.s3.us-west-2.amazonaws.com/flower-blouse.jpeg",
        tags: ["flower", "blouse"],
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
            date: '6-4-2012',
            rating: 4,
            review: "It's maroon, not red. Still pretty cute though.",
          },
        ],
      },
      {
        id: 8,
        imageUrl: "https://abracadabra-app.s3.us-west-2.amazonaws.com/flower-blouse2.jpeg",
        tags: ["flower", "blouse"],
        productDescription:
          "A fabulous red barret designed and made in France. Channel your inner french girl aesthetic with this hat",
        price: 140.99,
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
        id: 9,
        imageUrl: "https://abracadabra-app.s3.us-west-2.amazonaws.com/green-turtleneck.jpeg",
        tags: ["green", "turtleneck"],
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
            date: '6-2-2002',
            rating: 4,
            review: "It's maroon, not red. Still pretty cute though.",
          },
        ],
      },
      {
        id: 10,
        imageUrl: "https://abracadabra-app.s3.us-west-2.amazonaws.com/plaid-pants.jpeg",
        imageArray: [],
        tags: ["plaid", "pants"],
        productDescription:
          "A fabulous pair of pants designed and made in France. Channel your inner french girl aesthetic with this hat",
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
            date: '6-14-2002',
            rating: 4,
            review: "It's maroon, not red. Still pretty cute though.",
          },
        ],
      },
      {
        id: 11,
        imageUrl: "https://abracadabra-app.s3.us-west-2.amazonaws.com/print-skirt.jpeg",
        imageArray: [],
        tags: ["print", "skirt"],
        productDescription:
          "A fabulous pair of pants designed and made in France. Channel your inner french girl aesthetic with this hat",
        price: 30.99,
        discount: 5,
        dateAdded: '9-11-1990',
        productRating: 4,
        reviews: []
      },
      {
        id: 12,
        imageUrl: "https://abracadabra-app.s3.us-west-2.amazonaws.com/red-coat.jpeg",
        imageArray: [],
        tags: ["red", "coat"],
        productDescription:
          "A fabulous pair of pants designed and made in France. Channel your inner french girl aesthetic with this hat",
        price: 30.99,
        discount: 5,
        dateAdded: '9-11-1990',
        productRating: 4,
        reviews: []
      },
      {
        id: 13,
        imageUrl: "https://abracadabra-app.s3.us-west-2.amazonaws.com/striped-blouse.jpeg",
        imageArray: [],
        tags: ["striped", "blouse"],
        productDescription:
          "A fabulous pair of pants designed and made in France. Channel your inner french girl aesthetic with this hat",
        price: 30.99,
        discount: 5,
        dateAdded: '9-11-1990',
        productRating: 4,
        reviews: []
      },
    ]
  },
  reducers: {
    updateProduct: (state, action) => {

      state.value = action.payload
    },
  },
})

export const { updateProduct } = productSlice.actions
export default productSlice.reducer