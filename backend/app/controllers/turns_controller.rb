class TurnsController < ApplicationController
  before_action :set_turn, only: %i[ show update destroy ]

  # GET /turns
  def index
    @turns = Turn.all

    render json: @turns
  end

  # GET /turns/1
  def show
    render json: @turn
  end

  # def first_turns
  #   turn1 = Turn.create(answer: "its atleast making new turns", turn: 1, gameId: params[:gameId], playerId: params[:p1], flippedCards: params[:flippedCards])
  #   turn2 = Turn.create(turn: 2, gameId: params[:gameId], playerId: params[:p2], flippedCards: params[:flippedCards])
  #   render json: {turn1: turn1, turn2: turn2}
  # end
  

  # POST /turns
  def create
    @turn = Turn.new(turn_params)

    if @turn.save
      render json: @turn, status: :created, location: @turn
    else
      render json: @turn.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /turns/1
  def update
    if @turn.update(turn_params)
      render json: @turn
    else
      render json: @turn.errors, status: :unprocessable_entity
    end
  end

  # DELETE /turns/1
  def destroy
    @turn.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_turn
      @turn = Turn.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def turn_params
      params.require(:turn).permit(:p1, :p2, :active, :gameId, :turn, :playerId, :question, :answer, :flippedCards, :winning)
    end
end
