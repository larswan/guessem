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
    @friendship = Friendship.new(friendship_params)

    if @friendship.save
      render json: @friendship, status: :created, location: @friendship
    else
      render json: @friendship.errors, status: :unprocessable_entity
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
