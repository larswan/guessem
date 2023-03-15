class FriendshipsController < ApplicationController
  before_action :set_friendship, only: %i[ show update destroy ]

  # GET /friendships
  def index
    @friendships = Friendship.all

    render json: @friendships
  end

  # GET /friendships/1
  def show
    userId = params[:id]

    friendshipsA = Friendship.where(p2Id: params[:id])
    friendshipsB = Friendship.where(p1Id: params[:id])

    friendIds= []

    friendshipsA.each do |friendship|
        friendIds.append(friendship.p1Id)
    end

    friendshipsB.each do |friendship|
        friendIds.append(friendship.p2Id)
    end

    friends=[]

    friendIds.each do |friendId|
      friend = User.find_by(id: friendId)
      friends << friend
    end

    render json: friends
  end

  # POST /friendships
  def create

    # finding the users
    friend1 = User.find_by(id: params[:p1Id])
    friend2 = User.find_by(email: params[:p2email])

    # if theres not user with that email exit 
    if !friend2
      render json: {error: "There is no user with this e-mail"}, status: 200
      return
    end
    
    # finding existing friendships
    f1 = Friendship.find_by(p1Id: friend1.id, p2Id: friend2.id)
    f2 = Friendship.find_by(p2Id: friend1.id, p1Id: friend2.id)

    if f1 or f2 
      render json: {error: "Yall are already friends!"}, status: 200
      return
    else
      friendship = Friendship.new(p1Id: friend1.id, p2Id: friend2.id)
      if friendship.save
        # friend = User.find_by(id: friendship.p2Id)
        print friend2
        render json: friend2
      else
        render json: friendship.errors.full_messages, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /friendships/1
  def update
    if @friendship.update(friendship_params)
      render json: @friendship
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end

  # DELETE /friendships/1
  def destroy
    @friendship.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friendship
      @friendship = Friendship.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def friendship_params
      params.require(:friendship).permit(:p1Id, :p2Id)
    end
end
