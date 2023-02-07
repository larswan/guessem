puts '🍪 Seeding...'

user1 = User.create(name: "Larson Collier", email: 'collier.larson@gmail.com', givenName: 'Larson', familyName: 'Collier', googleId: '106319424501130968820', googleImageUrl: 'https://lh3.googleusercontent.com/a/AEdFTp5a4dYww8NfYeiv-SWZgqL-L5GUeAT_E3GznpPWGAo=s96-c', token: "tokentoken")
user2 = User.create(name: "Katherine Tsai", email: 'katherine@gmail.com', googleImageUrl: 'https://wallpapers.com/images/featured/4co57dtwk64fb7lv.jpg', token: "tokentoken")
user3 = User.create(name: "Vincent Lee", email: 'vincent@gmail.com', googleImageUrl: 'https://wallpapers.com/images/featured/4co57dtwk64fb7lv.jpg', token: "tokentoken")
user4 = User.create(name: "Serrin Doscher", email: 'serrin@gmail.com', googleImageUrl: 'https://i.pinimg.com/736x/5a/e5/98/5ae598ff624217b9a5c008beb8c512d0.jpg', token: "tokentoken")


friendship1 = Friendship.create(p1Id: user1.id, p2Id: user2.id)
friendship2 = Friendship.create(p1Id: user3.id, p2Id: user4.id)
friendship3 = Friendship.create(p1Id: user1.id, p2Id: user3.id)
friendship4 = Friendship.create(p1Id: user1.id, p2Id: user4.id)

cardset = CardSet.create(topicName: 'Food')

card1 = Card.create(cardSetId: cardset.id, name: 'Brunswick Stew',image: 'guessDaMateBackend/app/assets/images/white-brunswick stew.jpg' )
card2 = Card.create(cardSetId: cardset.id, name: 'Burger',image: 'guessDaMateBackend/app/assets/images/white-burger.jfif')
Card.create(cardSetId: cardset.id, name: 'Cereal',image: 'guessDaMateBackend/app/assets/images/white-cereal.jpeg')
Card.create(cardSetId: cardset.id, name: 'Ceviche',image: 'guessDaMateBackend/app/assets/images/white-ceviche.jpg')
Card.create(cardSetId: cardset.id, name: 'Chicken',image: 'guessDaMateBackend/app/assets/images/white-chicken.jpg')
Card.create(cardSetId: cardset.id, name: 'Coleslaw',image: 'guessDaMateBackend/app/assets/images/white-coleslaw.jpg')
Card.create(cardSetId: cardset.id, name: 'Cornbread',image: 'guessDaMateBackend/app/assets/images/white-cornbread.jpg')
Card.create(cardSetId: cardset.id, name: 'Creme Brulee',image: 'guessDaMateBackend/app/assets/images/white-creme brulee.png')
Card.create(cardSetId: cardset.id, name: 'Donut',image: 'guessDaMateBackend/app/assets/images/white-donuts.jpg')
Card.create(cardSetId: cardset.id, name: 'Eclair',image: 'guessDaMateBackend/app/assets/images/white-eclair.jpg')
Card.create(cardSetId: cardset.id, name: 'Gumdrop',image: 'guessDaMateBackend/app/assets/images/white-gumdrop.jpg')
Card.create(cardSetId: cardset.id, name: 'Jambalaya',image: 'guessDaMateBackend/app/assets/images/white-jambalaya.jpg')
Card.create(cardSetId: cardset.id, name: 'Japache',image: 'guessDaMateBackend/app/assets/images/white-japchae.jpg')
Card.create(cardSetId: cardset.id, name: 'Lobster Bisque',image: 'guessDaMateBackend/app/assets/images/white-lobster bisque.jpg')
Card.create(cardSetId: cardset.id, name: 'Macaroon',image: 'guessDaMateBackend/app/assets/images/white-macaroon.jpg')
Card.create(cardSetId: cardset.id, name: 'Musubi',image: 'guessDaMateBackend/app/assets/images/white-musubi.jpg')
Card.create(cardSetId: cardset.id, name: 'Onion Rings',image: 'guessDaMateBackend/app/assets/images/white-onion rings.jpg')
Card.create(cardSetId: cardset.id, name: 'Pasta',image: 'guessDaMateBackend/app/assets/images/white-pasta.jpeg')
Card.create(cardSetId: cardset.id, name: 'Pho',image: 'guessDaMateBackend/app/assets/images/white-pho.jpg')
Card.create(cardSetId: cardset.id, name: 'Pickled Eggs',image: 'guessDaMateBackend/app/assets/images/white-pickled eggs.jpg')

# game1=Game.create(p1: user1.id, p2: user2.id, p1SecretCard: card1, p2SecretCard: card2)

puts '🍪 Done seeding!'