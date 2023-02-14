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
    p1SecretCard = Card.find_by(id: newGame.p1SecretCard)
    p2SecretCard = Card.find_by(id: newGame.p2SecretCard)
    turns = Turn.where(gameId: @game.id)
    render json: {game: @game, p1: player1, p2: player2, turns: turns, p1SecretCard: p1SecretCard, p2SecretCard: p2SecretCard}
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

  def answerQuestion
    turn = Turn.find_by(turn: params[:turnNumber], gameId: params[:gameId])
    game = Game.find_by(id: turn.gameId)
    incrementTurn = game.currentTurn + 1
    if turn.update(answer: params[:answer], status: "answered") && game.update(phase: "guess", currentTurn: incrementTurn)
      p1SecretCard = Card.find_by(id: game.p1SecretCard)
      p2SecretCard = Card.find_by(id: game.p2SecretCard)
      player1 = User.find_by!(id: game.p1)
      player2= User.find_by!(id: game.p2)
      turns = Turn.where(gameId: game.id)
      
      render json: {game: game, p1: player1, p2: player2, turns: turns, p1SecretCard: p1SecretCard, p2SecretCard: p2SecretCard}
    else  
      render json: {error: "turn didnt update"}, status: 400
    end

  end

  def sendQuestion
    game = Game.find_by(id: params[:gameId])
    prevTurn = Turn.find_by(turn: params[:turnNumber], gameId: params[:gameId])

    prevTurn.update(question: params[:question], flippedCards: params[:cards], guessedCard: nil, status: "asked")
    game.update(whosTurn: params[:whosTurnNext], phase: "respond")

    incrementTurn2 = (prevTurn.turn + 2)
    nextTurn = Turn.new(turn: incrementTurn2, flippedCards: params[:cards], playerId: prevTurn.playerId, gameId: prevTurn.gameId)
    if nextTurn.save
      player1 = User.find_by!(id: game.p1)
      player2= User.find_by!(id: game.p2)
      turns = Turn.where(gameId: game.id)
      p1SecretCard = Card.find_by(id: game.p1SecretCard)
      p2SecretCard = Card.find_by(id: game.p2SecretCard)
      render json: {game: game, p1: player1, p2: player2, turns: turns,p1SecretCard: p1SecretCard, p2SecretCard: p2SecretCard}
    else 
      render json: {error: "nextTurn didnt save but atleast this error is showing"}, status:400
    end
  end

  def guessedWrong
    game = Game.find_by(id: params[:gameId])
    prevTurn = Turn.find_by(turn: params[:turnNumber], gameId: params[:gameId])
    
    
    prevTurn.update(question: params[:question], answer: "Nope.", flippedCards: params[:cards], guessedCard: params[:guessedCard], status: "answered")
    
    incrementTurn = (prevTurn.turn + 1)
    game.update(whosTurn: params[:whosTurnNext], currentTurn: incrementTurn, phase: "guess")
    
    incrementTurn2 = (prevTurn.turn + 2)
    nextTurn = Turn.new(turn: incrementTurn2, flippedCards: params[:cards], playerId: prevTurn.playerId, gameId: prevTurn.gameId)

    if nextTurn.save
      player1 = User.find_by!(id: game.p1)
      player2= User.find_by!(id: game.p2)
      turns = Turn.where(gameId: game.id)
      p1SecretCard = Card.find_by(id: game.p1SecretCard)
      p2SecretCard = Card.find_by(id: game.p2SecretCard)
      render json: {game: game, p1: player1, p2: player2, turns: turns,p1SecretCard: p1SecretCard, p2SecretCard: p2SecretCard}
    else 
      render json: {error: "guessedWrogn backend error"}, status:400
    end
  end

  ##############################
  def guessedRight
    game = Game.find_by(id: params[:gameId])
  
    if game.update(inProgress: false, phase: "won", winningAnswer: params[:winningAnswer], winningQuestion: params[:winningQuestion], winningUser: params[:winningUser], winningCard: params[:winningCard])
      player1 = User.find_by!(id: game.p1)
      player2= User.find_by!(id: game.p2)
      turns = Turn.where(gameId: game.id)
      winningCard = Card.find_by!(id: game.winningCard)
   
      render json: {game: game, p1: player1, p2: player2, turns: turns, winningCard: winningCard}
    else 
      render json: {error: "guessedRight error in backend"}, status:400
    end
  end
  ################################

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
      params.require(:game).permit(:turnNumber, :guessedCard, :phase, :winningQuestion, :winningAnswer, :winningCard, :winningUser, :p1SecretCard, :p2SecretCard, :whosTurn, :p1, :p2, :topic, :inProgress, :currentTurn, cards: [:id, :image, :name, :faceUp, :created_at, :updated_at])
    end
end

# winningCard: [:id, :image, :name, :faceUp, :created_at, :updated_at] 
# p1SecretCard: [:id, :image, :name, :faceUp, :created_at, :updated_at]
# p2SecretCard: [:id, :image, :name, :faceUp, :created_at, :updated_at]