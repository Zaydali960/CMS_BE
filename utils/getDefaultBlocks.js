function getDefaultBlocks() {
  return [
    {
      type: 'carousal',
      coverImage: 'https://media.istockphoto.com/id/1073935306/photo/girls-carrying-shopping-bags.jpg?s=612x612&w=0&k=20&c=JB-TrME32dc0VTnaXVxsbJIExZqR71m-iyVOnG-7puM=',
      text: 'This is an introductory paragraph for your new page. You can edit it anytime.',
    },
    {
      type: 'paragraph',
      text: '<p>This is an introductory paragraph for your new page. You can edit it anytime.</p>',
    },
    {
      type: 'banner',
      text: 'Welcome to the new page!',
      coverImage: 'https://media.istockphoto.com/id/1073935306/photo/girls-carrying-shopping-bags.jpg?s=612x612&w=0&k=20&c=JB-TrME32dc0VTnaXVxsbJIExZqR71m-iyVOnG-7puM=',
    },
    
    // {
    //   type: 'promoCardsBlock',
    //   text1: 'This is text 1.',
    //   image1: 'https://via.placeholder.com/300x200',
    //   text2: 'This is text 2.',
    //   image2: 'https://via.placeholder.com/300x200'
    // }
  ];
}

module.exports = getDefaultBlocks;
