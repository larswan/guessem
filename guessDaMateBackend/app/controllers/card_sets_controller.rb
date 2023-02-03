class CardSetsController < ApplicationController
  before_action :set_card_set, only: %i[ show edit update destroy ]

  # GET /card_sets or /card_sets.json
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

  # GET /card_sets/1 or /card_sets/1.json
  def show
    
  end

  # GET /card_sets/new
  def new
    @card_set = CardSet.new
  end

  # GET /card_sets/1/edit
  def edit
  end

  # POST /card_sets or /card_sets.json
  def create
    @card_set = CardSet.new(card_set_params)

    respond_to do |format|
      if @card_set.save
        format.html { redirect_to card_set_url(@card_set), notice: "Card set was successfully created." }
        format.json { render :show, status: :created, location: @card_set }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @card_set.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /card_sets/1 or /card_sets/1.json
  def update
    respond_to do |format|
      if @card_set.update(card_set_params)
        format.html { redirect_to card_set_url(@card_set), notice: "Card set was successfully updated." }
        format.json { render :show, status: :ok, location: @card_set }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @card_set.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /card_sets/1 or /card_sets/1.json
  def destroy
    @card_set.destroy

    respond_to do |format|
      format.html { redirect_to card_sets_url, notice: "Card set was successfully destroyed." }
      format.json { head :no_content }
    end
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
