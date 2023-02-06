class CardSetsController < ApplicationController
  before_action :set_card_set, only: %i[ show update destroy ]

  # GET /card_sets
  def index
    @card_sets = CardSet.all

    returnArray = []

    @card_sets.each do |set|
      containedCards = Card.where(cardSetId: set.id)
      newObj = {id: set.id, topic: set.topicName, cards: containedCards}
      returnArray << newObj
    end
    
    render json: returnArray
  end

  # GET /card_sets/1
  def show
    render json: @card_set
  end

  # POST /card_sets
  def create
    @card_set = CardSet.new(card_set_params)

    if @card_set.save
      render json: @card_set, status: :created, location: @card_set
    else
      render json: @card_set.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /card_sets/1
  def update
    if @card_set.update(card_set_params)
      render json: @card_set
    else
      render json: @card_set.errors, status: :unprocessable_entity
    end
  end

  # DELETE /card_sets/1
  def destroy
    @card_set.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card_set
      @card_set = CardSet.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def card_set_params
      params.require(:card_set).permit(:topicName)
    end
end
