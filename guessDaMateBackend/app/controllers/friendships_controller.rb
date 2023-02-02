class FriendshipsController < ApplicationController
  before_action :set_friendship, only: %i[ show edit update destroy ]

  # GET /friendships or /friendships.json
  def index
    @friendships = Friendship.all
    render json: @friendships

  end

  # GET /friendships/1 or /friendships/1.json
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

  # GET /friendships/new
  def new
    @friendship = Friendship.new
    render json: @friendship
  end

  # GET /friendships/1/edit
  def edit
  end

  # POST /friendships or /friendships.json
  def create
    @friendship = Friendship.new(friendship_params)

    respond_to do |format|
      if @friendship.save
        format.html { redirect_to friendship_url(@friendship), notice: "Friendship was successfully created." }
        format.json { render :show, status: :created, location: @friendship }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @friendship.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /friendships/1 or /friendships/1.json
  def update
    respond_to do |format|
      if @friendship.update(friendship_params)
        format.html { redirect_to friendship_url(@friendship), notice: "Friendship was successfully updated." }
        format.json { render :show, status: :ok, location: @friendship }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @friendship.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /friendships/1 or /friendships/1.json
  def destroy
    @friendship.destroy

    respond_to do |format|
      format.html { redirect_to friendships_url, notice: "Friendship was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friendship
      @friendship = Friendship.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def friendship_params
      params.fetch(:friendship, {})
    end
end
