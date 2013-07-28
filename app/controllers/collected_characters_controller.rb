class CollectedCharactersController < ApplicationController
  # GET /collected_characters
  # GET /collected_characters.json
  def index
    @collected_characters = CollectedCharacter.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @collected_characters }
    end
  end

  # GET /collected_characters/1
  # GET /collected_characters/1.json
  def show
    @collected_character = CollectedCharacter.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @collected_character }
    end
  end

  # GET /collected_characters/new
  # GET /collected_characters/new.json
  def new
    @collected_character = CollectedCharacter.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @collected_character }
    end
  end

  # GET /collected_characters/1/edit
  def edit
    @collected_character = CollectedCharacter.find(params[:id])
  end

  # POST /collected_characters
  # POST /collected_characters.json
  def create
    @collected_character = CollectedCharacter.new(params[:collected_character])

    respond_to do |format|
      if @collected_character.save
        format.html { redirect_to @collected_character, notice: 'Collected character was successfully created.' }
        format.json { render json: @collected_character, status: :created, location: @collected_character }
      else
        format.html { render action: "new" }
        format.json { render json: @collected_character.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /collected_characters/1
  # PUT /collected_characters/1.json
  def update
    @collected_character = CollectedCharacter.find(params[:id])

    respond_to do |format|
      if @collected_character.update_attributes(params[:collected_character])
        format.html { redirect_to @collected_character, notice: 'Collected character was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @collected_character.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /collected_characters/1
  # DELETE /collected_characters/1.json
  def destroy
    @collected_character = CollectedCharacter.find(params[:id])
    @collected_character.destroy

    respond_to do |format|
      format.html { redirect_to collected_characters_url }
      format.json { head :no_content }
    end
  end
end
