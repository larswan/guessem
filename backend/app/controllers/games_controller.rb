class GamesController < ApplicationController
  before_action :set_game, only: %i[ show update destroy ]

  # GET /games
  def index
    @games = Game.all
    render json: @games
  end

  # GET /games/1
  def show
    newGame = @game.dup
    player1 = User.find_by!(id: @game.p1)
    player2= User.find_by!(id: @game.p2)
    turns = Turn.where(gameId: @game.id)
    render json: {game: @game, p1: player1, p2: player2, turns: turns}
  end

  def active_games
    userId = params[:id]
    games = []

    userIsP1 = Game.where(p1: params[:id], inProgress: true)
    userIsP2 = Game.where(p2: params[:id], inProgress: true)

    userIsP1.each do |game|
      newGame = {id: game.id, whosTurn: game.whosTurn}
      user = User.find_by!(id: game.p2)
      newGame["opponentName"] = user.name
      newGame['topic'] = game.topic
      newGame['whosTurn'] = game.whosTurn
      
      games<<newGame
    end

    userIsP2.each do |game|
      newGame = {id: game.id, whosTurn: game.whosTurn}
      user = User.find_by!(id: game.p1)
      newGame["opponentName"] = user.name
      newGame['topic'] = game.topic
      
      games<<newGame
    end    
    
    render json: games
  end

  # POST /games
  def newGame
    gamey = Game.create(game_params)
    turn1 = Turn.create(turn: 0, gameId: gamey.id, playerId: gamey.p1, flippedCards: gamey.cards)
    turn2 = Turn.create(turn: 1, gameId: gamey.id, playerId: gamey.p2, flippedCards: gamey.cards)
    if gamey
      render json: {game: gamey, turn1: turn1, turn2: turn2}
    else
      render json: gamey.errors.full_messages, status: :unprocessable_entity
    end
  end

  def sendQuestion
    game = Game.find_by(id: params[:gameId])
    prevTurn = Turn.find_by(id: params[:turnId])

    prevTurn.update(active: false, question: params[:question], flippedCards: params[:cards], guessedCard: nil)
    game.update(whosTurn: params[:whosTurnNext], currentTurn: (prevTurn.turn +1))

    nextTurn = Turn.new()
    nextTurn.save

    # CAN I CALL "SHOW" HERE? game.show()
    #self.show

  end

  # PATCH/PUT /games/1
  def update
    if @game.update(game_params)
      render json: @game
    else
      render json: @game.errors, status: :unprocessable_entity
    end
  end

  # DELETE /games/1
  def destroy
    @game.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def game_params
      params.require(:game).permit(:whosTurn, :p1, :p2, :p1Turn, :p2Turn, :p1SecretCard, :p2SecretCard, :topic, :inProgress, :currentTurn, cards: [:id, :image, :name, :faceUp, :created_at, :updated_at])
    end
end
