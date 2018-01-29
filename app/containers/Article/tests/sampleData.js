export const author = {
  bio: null,
  following: false,
  image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
  username: 'trinhnguyen',
};

export const fixture = {
  author,
  title: 'sample title',
  body: '<h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1> ↵↵<h2>Praesentium blanditiis architecto aperiam porro, voluptates fugiat ullam</h2> ↵↵<h3>Odio rerum earum libero deserunt voluptas, repellat iste mollitia, aliquam</h3>',
  description: 'sample description',
  createdAt: '2017-10-18T11:27:14.109Z',
  slug: 'sample-slug',
  tagList: [
    'foo',
    'bar',
    'baz',
  ],
  comments: [
    {
      id: 1,
      author,
      body: 'first sample comment',
      createdAt: '2017-11-06T06:16:07.445Z',
      updatedAt: '2017-11-06T06:16:07.445Z',
    },
    {
      id: 2,
      author,
      body: 'second sample comment',
      createdAt: '2017-11-06T06:16:07.445Z',
      updatedAt: '2017-11-06T06:16:07.445Z',
    },
  ],
};
